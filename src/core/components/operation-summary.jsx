import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Iterable, List } from "immutable"
import ImPropTypes from "react-immutable-proptypes"
import toString from "lodash/toString"


const getTokenManager = (security, authSelectors) => {
  if (!security || !security.count()) {
    return null
  }

  const authorized = authSelectors.authorized()
  if (!authorized) {
    return null
  }

  const allDefinitions = authSelectors.definitionsToAuthorize()

  // This logic might need to be more sophisticated if an operation has multiple bearer schemes.
  // For now, find the first bearer auth security requirement.
  const bearerAuthRequirement = security.find((requirement) => {
    const name = requirement.keySeq().first() // get the name of the security scheme
    const definitionMap = allDefinitions.find(def => def.has(name))
    const definition = definitionMap ? definitionMap.get(name) : null
    return definition && definition.get("scheme") === "bearer"
  })

  if (!bearerAuthRequirement) {
    return null
  }

  const name = bearerAuthRequirement.keySeq().first()
  const tokenManager = authorized.getIn([name, "tokenManager"])
  return tokenManager ? { name, ...tokenManager.toJS() } : null
}


export default class OperationSummary extends PureComponent {

  static propTypes = {
    specPath: ImPropTypes.list.isRequired,
    operationProps: PropTypes.instanceOf(Iterable).isRequired,
    isShown: PropTypes.bool.isRequired,
    toggleShown: PropTypes.func.isRequired,
    getComponent: PropTypes.func.isRequired,
    getConfigs: PropTypes.func.isRequired,
    authActions: PropTypes.object,
    authSelectors: PropTypes.object,
  }

  static defaultProps = {
    operationProps: null,
    specPath: List(),
    summary: ""
  }

  handleTokenSelect = (selectedTokenName) => {
    const { authActions, authSelectors, operationProps } = this.props
    const security = operationProps.get("security")
    const tokenManager = getTokenManager(security, authSelectors)
    const authorized = authSelectors.authorized()
    const bearerAuthData = authorized.get(tokenManager.name)
    if (bearerAuthData) {
      const newTokenManager = bearerAuthData.get("tokenManager").set("selectedToken", selectedTokenName)
      const payloadForAction = bearerAuthData.set("value", newTokenManager)
      authActions.authorizeWithPersistOption({ [tokenManager.name]: payloadForAction })
    }
  }

  handleTokenButtonClick = (e) => {
    const { name } = e.currentTarget.dataset
    this.handleTokenSelect(name)
  }

  handleClearToken = () => {
    this.handleTokenSelect("")
  }

  onAuthorizeBtnClick = () => {
    const { authActions, authSelectors, operationProps } = this.props
    const security = operationProps.get("security")
    const applicableDefinitions = authSelectors.definitionsForRequirements(security)
    authActions.showDefinitions(applicableDefinitions)
  }

  render() {

    let {
      isShown,
      getComponent,
      authSelectors,
      operationProps,
      specPath,
    } = this.props

    let {
      summary,
      isAuthorized,
      method,
      op,
      showSummary,
      path,
      operationId,
      originalOperationId,
      displayOperationId,
    } = operationProps.toJS()

    let {
      summary: resolvedSummary,
    } = op

    let security = operationProps.get("security")

    const AuthorizeOperationBtn = getComponent("authorizeOperationBtn", true)
    const OperationSummaryMethod = getComponent("OperationSummaryMethod")
    const OperationSummaryPath = getComponent("OperationSummaryPath")
    const JumpToPath = getComponent("JumpToPath", true)
    const CopyToClipboardBtn = getComponent("CopyToClipboardBtn", true)
    const ArrowUpIcon = getComponent("ArrowUpIcon")
    const ArrowDownIcon = getComponent("ArrowDownIcon")

    const hasSecurity = security && !!security.count()
    const securityIsOptional = hasSecurity && security.size === 1 && security.first().isEmpty()
    const allowAnonymous = !hasSecurity || securityIsOptional

    const tokenManager = getTokenManager(security, authSelectors)

    return (
      <div className={`opblock-summary opblock-summary-${method}`} >
        <button
          aria-expanded={isShown}
          className="opblock-summary-control"
          onClick={this.props.toggleShown}
        >
          <OperationSummaryMethod method={method} />
          <div className="opblock-summary-path-description-wrapper">
            <OperationSummaryPath getComponent={getComponent} operationProps={operationProps} specPath={specPath} />

            {!showSummary ? null :
              <div className="opblock-summary-description">
                {toString(resolvedSummary || summary)}
              </div>
            }
          </div>

          {displayOperationId && (originalOperationId || operationId) ? <span className="opblock-summary-operation-id">{originalOperationId || operationId}</span> : null}
        </button>
        <CopyToClipboardBtn textToCopy={`${specPath.get(1)}`} />
        {
          tokenManager && tokenManager.tokens.length > 0 && (
            <div className="token-selector">
              {tokenManager.tokens.map(token => (
                <button
                  key={token.name}
                  data-name={token.name}
                  className={`btn btn-sm ${tokenManager.selectedToken === token.name ? "selected" : ""}`}
                  onClick={this.handleTokenButtonClick}
                >
                  {token.name}
                </button>
              ))}
              <button
                className="btn btn-sm clear"
                onClick={this.handleClearToken}
              >
                clear
              </button>
            </div>
          )
        }
        {
          allowAnonymous ? null :
            <AuthorizeOperationBtn
              isAuthorized={isAuthorized}
              onClick={this.onAuthorizeBtnClick}
            />
        }
        <JumpToPath path={specPath} />{/* TODO: use wrapComponents here, swagger-ui doesn't care about jumpToPath */}
        <button
          aria-label={`${method} ${path.replace(/\//g, "\u200b/")}`}
          className="opblock-control-arrow"
          aria-expanded={isShown}
          tabIndex="-1"
          onClick={this.props.toggleShown}>
          {isShown ? <ArrowUpIcon className="arrow" /> : <ArrowDownIcon className="arrow" />}
        </button>
      </div>
    )
  }
}
