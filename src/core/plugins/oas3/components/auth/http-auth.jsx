import React from "react"
import PropTypes from "prop-types"
import { fromJS } from "immutable"

export default class HttpAuth extends React.Component {
  static propTypes = {
    authorized: PropTypes.object,
    getComponent: PropTypes.func.isRequired,
    errSelectors: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    authSelectors: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    let { name, schema } = this.props
    const authorizedValue = props.authorized?.get(name)
    const tokenManager = authorizedValue?.get("tokenManager")

    this.state = {
      name: name,
      schema: schema,
      value: fromJS(tokenManager || {
        tokens: [],
        selectedToken: null
      }),
      newToken: {
        name: "",
        value: "",
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const authorizedValue = nextProps.authorized?.get(this.state.name)
    const tokenManager = authorizedValue?.get("tokenManager")
    if (tokenManager) {
      this.setState({ value: fromJS(tokenManager) })
    }
  }

  getValue() {
    let { name, authorized } = this.props

    return authorized && authorized.getIn([name, "value"])
  }

  onChange = (e) => {
    let { onChange } = this.props
    let { value, name } = e.target

    let newValue = Object.assign({}, this.state.value)

    if (name) {
      newValue[name] = value
    } else {
      newValue = value
    }

    this.setState({ value: newValue }, () => onChange(this.state))

  }

  onTokenChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      newToken: {
        ...prevState.newToken,
        [name]: value
      }
    }))
  }

  addToken = () => {
    const { newToken, value } = this.state
    if (newToken.name && newToken.value) {
      const newTokens = value.get("tokens").push(fromJS(newToken))
      const newState = {
        ...this.state,
        value: value.set("tokens", newTokens),
        newToken: { name: "", value: "" }
      }
      this.setState(newState, () => this.props.onChange({
        name: this.state.name,
        schema: this.state.schema,
        value: newState.value.toJS()
      }))
    }
  }

  _removeToken = (e) => {
    this.removeToken(e.target.dataset.name)
  }

  _selectToken = (e) => {
    this.selectToken(e.target.dataset.name)
  }

  removeToken = (tokenNameToRemove) => {
    const { value } = this.state
    const newTokens = value.get("tokens").filter(t => t.get("name") !== tokenNameToRemove)
    const newSelectedToken = value.get("selectedToken") === tokenNameToRemove ? null : value.get("selectedToken")
    const newState = {
      ...this.state,
      value: value.set("tokens", newTokens).set("selectedToken", newSelectedToken)
    }
    this.setState(newState, () => this.props.onChange({
      name: this.state.name,
      schema: this.state.schema,
      value: newState.value.toJS()
    }))
  }

  selectToken = (tokenName) => {
    const { value } = this.state
    const newState = {
      ...this.state,
      value: value.set("selectedToken", tokenName)
    }
    this.setState(newState, () => this.props.onChange({
      name: this.state.name,
      schema: this.state.schema,
      value: newState.value.toJS()
    }))
  }


  render() {
    let { schema, getComponent, errSelectors, name, authSelectors } = this.props
    const Input = getComponent("Input")
    const Row = getComponent("Row")
    const Col = getComponent("Col")
    const AuthError = getComponent("authError")
    const Markdown = getComponent("Markdown", true)
    const JumpToPath = getComponent("JumpToPath", true)

    const scheme = (schema.get("scheme") || "").toLowerCase()
    const path = authSelectors.selectAuthPath(name)
    const value = this.state.value
    let errors = errSelectors.allErrors().filter(err => err.get("authId") === name)
    const tokens = value.get("tokens")
    const selectedTokenName = value.get("selectedToken")
    const selectedToken = tokens.find(t => t.get("name") === selectedTokenName)

    if (scheme === "basic") {
      let username = value ? value.get("username") : null
      return <div>
        <h4>
          <code>{name}</code>&nbsp;
          (http, Basic)
          <JumpToPath path={path} />
        </h4>
        {username && <h6>Authorized</h6>}
        <Row>
          <Markdown source={schema.get("description")} />
        </Row>
        <Row>
          <label htmlFor="auth-basic-username">Username:</label>
          {
            username ? <code> {username} </code>
              : <Col>
                <Input
                  id="auth-basic-username"
                  type="text"
                  required="required"
                  name="username"
                  aria-label="auth-basic-username"
                  onChange={this.onChange}
                  autoFocus
                />
              </Col>
          }
        </Row>
        <Row>
          <label htmlFor="auth-basic-password">Password:</label>
          {
            username ? <code> ****** </code>
              : <Col>
                <Input
                  id="auth-basic-password"
                  autoComplete="new-password"
                  name="password"
                  type="password"
                  aria-label="auth-basic-password"
                  onChange={this.onChange}
                />
              </Col>
          }
        </Row>
        {
          errors.valueSeq().map((error, key) => {
            return <AuthError error={error}
              key={key} />
          })
        }
      </div>
    }

    if (scheme === "bearer") {
      return (
        <div className="bearer-auth">
          <h4>
            <code>{name}</code>&nbsp;
            (http, Bearer)
            <JumpToPath path={path} />
          </h4>
          {selectedToken && <h6>Authorized with: <code>{selectedToken.get("name")}</code></h6>}
          <Row>
            <Markdown source={schema.get("description")} />
          </Row>
          <div className="new-token-form">
            <h5>Add a new token</h5>
            <Row className="add-token-row">
              <Col>
                <Input
                  type="text"
                  name="name"
                  placeholder="Token Name (e.g., My API Key)"
                  value={this.state.newToken.name}
                  onChange={this.onTokenChange}
                  aria-label="token-name-input"
                />
              </Col>
              <Col>
                <Input
                  type="text"
                  name="value"
                  placeholder="Token Value"
                  value={this.state.newToken.value}
                  onChange={this.onTokenChange}
                  aria-label="token-value-input"
                />
              </Col>
              <Col>
                <button className="btn" onClick={this.addToken}>+</button>
              </Col>
            </Row>
          </div>
          {tokens && tokens.size > 0 &&
            <div className="token-list">
              <h5>Your Tokens</h5>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token, index) => {
                    const tokenName = token.get("name")
                    return (
                      <tr key={index} className={selectedTokenName === tokenName ? "selected" : ""}>
                        <td>{tokenName}</td>
                        <td>
                          <button className="btn btn-sm" data-name={tokenName} onClick={this._selectToken} disabled={selectedTokenName === tokenName}>
                            {selectedTokenName === tokenName ? "Selected" : "Select"}
                          </button>
                          <button className="btn btn-sm btn-danger" data-name={tokenName} onClick={this._removeToken}>Remove</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          }
          {
            errors.valueSeq().map((error, key) => {
              return <AuthError error={error}
                key={key} />
            })
          }
        </div>
      )
    }
    return <div>
      <em><b>{name}</b> HTTP authentication: unsupported scheme {`'${scheme}'`}</em>
    </div>
  }
}
