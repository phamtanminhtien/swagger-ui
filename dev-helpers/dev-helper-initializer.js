/* eslint-disable no-undef */
window.onload = function () {
  window["SwaggerUIBundle"] = window["swagger-ui-bundle"]
  window["SwaggerUIStandalonePreset"] = window["swagger-ui-standalone-preset"]

  let url = window.location.search.match(/url=([^&]+)/)
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1])
  } else {
    url = window.location.origin
  }
  let options = {
    "swaggerDoc": {
      "openapi": "3.0.0",
      "servers": [
        {
          "url": "http://localhost:6970"
        }
      ],
      "paths": {
        "/api/v1/health": {
          "get": {
            "operationId": "AppController_getHealth_v1",
            "parameters": [],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "tags": [
              "App"
            ]
          }
        },
        "/api/v1/moderators/teachers/teacher-requests/{id}": {
          "post": {
            "operationId": "ModeratorTeacherController_handleTeacherRequest_v1",
            "parameters": [
              {
                "name": "id",
                "required": true,
                "in": "path",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HandleTeacherRequestDto"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Moderator Teacher"
            ]
          }
        },
        "/api/v1/systems/topics": {
          "get": {
            "operationId": "SystemTopicController_findAll_v1",
            "parameters": [
              {
                "name": "page",
                "required": false,
                "in": "query",
                "description": "Allow find all if no pagination",
                "schema": {
                  "type": "number"
                }
              },
              {
                "name": "limit",
                "required": false,
                "in": "query",
                "description": "Allow find all if no pagination",
                "schema": {
                  "type": "number"
                }
              },
              {
                "name": "search",
                "required": false,
                "in": "query",
                "description": "The search query",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "tags": [
              "System Topic"
            ]
          }
        },
        "/api/v1/systems/topics/{idOrSlug}": {
          "get": {
            "operationId": "SystemTopicController_findOne_v1",
            "parameters": [
              {
                "name": "idOrSlug",
                "required": true,
                "in": "path",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "tags": [
              "System Topic"
            ]
          }
        },
        "/api/v1/systems/subjects": {
          "get": {
            "operationId": "SystemSubjectController_findAll_v1",
            "parameters": [
              {
                "name": "page",
                "required": false,
                "in": "query",
                "description": "Allow find all if no pagination",
                "schema": {
                  "type": "number"
                }
              },
              {
                "name": "limit",
                "required": false,
                "in": "query",
                "description": "Allow find all if no pagination",
                "schema": {
                  "type": "number"
                }
              },
              {
                "name": "search",
                "required": false,
                "in": "query",
                "description": "The search query",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "tags": [
              "System Subject"
            ]
          }
        },
        "/api/v1/systems/subjects/{idOrCode}": {
          "get": {
            "operationId": "SystemSubjectController_findOne_v1",
            "parameters": [
              {
                "name": "idOrCode",
                "required": true,
                "in": "path",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "tags": [
              "System Subject"
            ]
          }
        },
        "/api/v1/teachers/exams": {
          "post": {
            "operationId": "TeacherExamController_create_v1",
            "parameters": [],
            "responses": {
              "201": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Teacher Exam"
            ]
          },
          "get": {
            "operationId": "TeacherExamController_findAll_v1",
            "parameters": [
              {
                "name": "page",
                "required": true,
                "in": "query",
                "description": "Page number (1-based)",
                "schema": {
                  "minimum": 1,
                  "default": 1,
                  "type": "number"
                }
              },
              {
                "name": "limit",
                "required": true,
                "in": "query",
                "description": "Number of items per page",
                "schema": {
                  "minimum": 1,
                  "maximum": 100,
                  "default": 10,
                  "type": "number"
                }
              },
              {
                "name": "search",
                "required": false,
                "in": "query",
                "description": "The search query",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Teacher Exam"
            ]
          }
        },
        "/api/v1/teachers/classrooms": {
          "post": {
            "operationId": "TeacherClassroomController_create_v1",
            "parameters": [],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreateClassroomDto"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Teacher Classroom"
            ]
          },
          "get": {
            "operationId": "TeacherClassroomController_findAll_v1",
            "parameters": [
              {
                "name": "page",
                "required": true,
                "in": "query",
                "description": "Page number (1-based)",
                "schema": {
                  "minimum": 1,
                  "default": 1,
                  "type": "number"
                }
              },
              {
                "name": "limit",
                "required": true,
                "in": "query",
                "description": "Number of items per page",
                "schema": {
                  "minimum": 1,
                  "maximum": 100,
                  "default": 10,
                  "type": "number"
                }
              },
              {
                "name": "search",
                "required": false,
                "in": "query",
                "description": "The search query",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Teacher Classroom"
            ]
          }
        },
        "/api/v1/teachers/classrooms/{idOrCode}": {
          "get": {
            "operationId": "TeacherClassroomController_findOne_v1",
            "parameters": [
              {
                "name": "idOrCode",
                "required": true,
                "in": "path",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Teacher Classroom"
            ]
          },
          "patch": {
            "operationId": "TeacherClassroomController_update_v1",
            "parameters": [
              {
                "name": "idOrCode",
                "required": true,
                "in": "path",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UpdateClassroomDto"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Teacher Classroom"
            ]
          }
        },
        "/api/v1/teachers/members": {
          "get": {
            "operationId": "TeacherMemberController_getMembers_v1",
            "parameters": [
              {
                "name": "page",
                "required": true,
                "in": "query",
                "description": "Page number (1-based)",
                "schema": {
                  "minimum": 1,
                  "default": 1,
                  "type": "number"
                }
              },
              {
                "name": "limit",
                "required": true,
                "in": "query",
                "description": "Number of items per page",
                "schema": {
                  "minimum": 1,
                  "maximum": 100,
                  "default": 10,
                  "type": "number"
                }
              },
              {
                "name": "search",
                "required": false,
                "in": "query",
                "description": "The search query",
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "classroomId",
                "required": false,
                "in": "query",
                "description": "The classroom id",
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "classroomCode",
                "required": false,
                "in": "query",
                "description": "The classroom code",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Teacher Member"
            ]
          }
        },
        "/api/v1/teachers/questions": {
          "post": {
            "operationId": "TeacherQuestionController_create_v1",
            "parameters": [],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreateQuestionDto"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Teacher Question"
            ]
          },
          "get": {
            "operationId": "TeacherQuestionController_findAll_v1",
            "parameters": [
              {
                "name": "page",
                "required": true,
                "in": "query",
                "description": "Page number (1-based)",
                "schema": {
                  "minimum": 1,
                  "default": 1,
                  "type": "number"
                }
              },
              {
                "name": "limit",
                "required": true,
                "in": "query",
                "description": "Number of items per page",
                "schema": {
                  "minimum": 1,
                  "maximum": 100,
                  "default": 10,
                  "type": "number"
                }
              },
              {
                "name": "search",
                "required": false,
                "in": "query",
                "description": "The search query",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Teacher Question"
            ]
          }
        },
        "/api/v1/auth/sign-up": {
          "post": {
            "operationId": "AuthController_signUp_v1",
            "parameters": [],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SignUpDto"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": ""
              }
            },
            "tags": [
              "Auth"
            ]
          }
        },
        "/api/v1/auth/sign-in": {
          "post": {
            "operationId": "AuthController_signIn_v1",
            "parameters": [],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SignInDto"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": ""
              }
            },
            "tags": [
              "Auth"
            ]
          }
        },
        "/api/v1/auth/refresh-tokens": {
          "post": {
            "operationId": "AuthController_refreshTokens_v1",
            "parameters": [],
            "responses": {
              "201": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              }
            ],
            "tags": [
              "Auth"
            ]
          }
        },
        "/api/v1/auth/verify-email": {
          "post": {
            "operationId": "AuthController_verifyEmail_v1",
            "parameters": [],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VerifyEmailDto"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": ""
              }
            },
            "tags": [
              "Auth"
            ]
          }
        },
        "/api/v1/auth/resend-verification": {
          "post": {
            "operationId": "AuthController_resendVerification_v1",
            "parameters": [],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResendVerificationDto"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": ""
              }
            },
            "tags": [
              "Auth"
            ]
          }
        },
        "/api/v1/users/me": {
          "get": {
            "operationId": "UserController_me_v1",
            "parameters": [],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              },
              {
                "bearer": []
              }
            ],
            "tags": [
              "User"
            ]
          },
          "patch": {
            "operationId": "UserController_updateMe_v1",
            "parameters": [],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UpdateUserDto"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              },
              {
                "bearer": []
              }
            ],
            "tags": [
              "User"
            ]
          }
        },
        "/api/v1/users/me/teacher-requests": {
          "post": {
            "operationId": "UserController_createTeacherRequest_v1",
            "parameters": [],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreateTeacherRequestDto"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              },
              {
                "bearer": []
              }
            ],
            "tags": [
              "User"
            ]
          },
          "get": {
            "operationId": "UserController_getTeacherRequest_v1",
            "parameters": [
              {
                "name": "page",
                "required": false,
                "in": "query",
                "description": "Allow find all if no pagination",
                "schema": {
                  "type": "number"
                }
              },
              {
                "name": "limit",
                "required": false,
                "in": "query",
                "description": "Allow find all if no pagination",
                "schema": {
                  "type": "number"
                }
              }
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "security": [
              {
                "bearer": []
              },
              {
                "bearer": []
              }
            ],
            "tags": [
              "User"
            ]
          }
        }
      },
      "info": {
        "title": "Exam API",
        "description": "The Exam API documentation",
        "version": "1.0",
        "contact": {}
      },
      "tags": [],
      "components": {
        "securitySchemes": {
          "bearer": {
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "type": "http"
          }
        },
        "schemas": {
          "HandleTeacherRequestDto": {
            "type": "object",
            "properties": {
              "status": {
                "type": "string",
                "description": "Teacher request status",
                "enum": [
                  "pending",
                  "approved",
                  "rejected"
                ],
                "example": "approved"
              },
              "rejectedReason": {
                "type": "string",
                "description": "Rejected reason",
                "example": "Rejected reason"
              }
            },
            "required": [
              "status"
            ]
          },
          "CreateClassroomDto": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "description": "Classroom name",
                "example": "Mathematics 101"
              },
              "description": {
                "type": "string",
                "description": "Classroom description",
                "example": "Introduction to basic mathematics concepts"
              },
              "type": {
                "type": "string",
                "description": "Classroom type",
                "enum": [
                  "PUBLIC",
                  "PRIVATE"
                ],
                "example": "PUBLIC",
                "default": "PUBLIC"
              },
              "showInWebsite": {
                "type": "boolean",
                "description": "Whether to show classroom in website",
                "example": false,
                "default": false
              },
              "bannerImage": {
                "type": "string",
                "description": "Banner image URL",
                "example": "https://example.com/banner.jpg"
              }
            },
            "required": [
              "name",
              "type"
            ]
          },
          "UpdateClassroomDto": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "description": "Classroom name",
                "example": "Mathematics 101"
              },
              "description": {
                "type": "string",
                "description": "Classroom description",
                "example": "Introduction to basic mathematics concepts"
              },
              "showInWebsite": {
                "type": "boolean",
                "description": "Whether to show classroom in website",
                "example": false,
                "default": false
              },
              "bannerImage": {
                "type": "string",
                "description": "Banner image URL",
                "example": "https://example.com/banner.jpg"
              }
            },
            "required": [
              "name"
            ]
          },
          "MultipleChoiceOptionsDto": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of question",
                "enum": [
                  "MULTIPLE_CHOICE",
                  "TRUE_FALSE_GROUP",
                  "NUMBER_INPUT",
                  "TEXT_INPUT"
                ],
                "example": "MULTIPLE_CHOICE"
              },
              "choices": {
                "description": "Array of choice options for the question",
                "example": [
                  "Paris",
                  "London",
                  "Berlin",
                  "Madrid"
                ],
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "multipleAnswers": {
                "type": "boolean",
                "description": "Whether multiple answers are allowed",
                "example": false
              }
            },
            "required": [
              "type",
              "choices",
              "multipleAnswers"
            ]
          },
          "TrueFalseGroupOptionsDto": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of question",
                "enum": [
                  "MULTIPLE_CHOICE",
                  "TRUE_FALSE_GROUP",
                  "NUMBER_INPUT",
                  "TEXT_INPUT"
                ],
                "example": "TRUE_FALSE_GROUP"
              },
              "statements": {
                "description": "Array of statements to be marked as true or false",
                "example": [
                  "Paris is the capital of France",
                  "London is in Germany",
                  "Berlin has a population over 1 million"
                ],
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "type",
              "statements"
            ]
          },
          "NumberInputOptionsDto": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of question",
                "enum": [
                  "MULTIPLE_CHOICE",
                  "TRUE_FALSE_GROUP",
                  "NUMBER_INPUT",
                  "TEXT_INPUT"
                ],
                "example": "NUMBER_INPUT"
              },
              "min": {
                "type": "number",
                "description": "Minimum allowed value (inclusive)",
                "example": 0
              },
              "max": {
                "type": "number",
                "description": "Maximum allowed value (inclusive)",
                "example": 100
              },
              "precision": {
                "type": "number",
                "description": "Number of decimal places allowed",
                "example": 2,
                "minimum": 0
              }
            },
            "required": [
              "type"
            ]
          },
          "TextInputOptionsDto": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of question",
                "enum": [
                  "MULTIPLE_CHOICE",
                  "TRUE_FALSE_GROUP",
                  "NUMBER_INPUT",
                  "TEXT_INPUT"
                ],
                "example": "TEXT_INPUT"
              },
              "maxLength": {
                "type": "number",
                "description": "Maximum length of the text input",
                "example": 500,
                "minimum": 1
              },
              "multiline": {
                "type": "boolean",
                "description": "Whether multiline text input is allowed",
                "example": true
              }
            },
            "required": [
              "type"
            ]
          },
          "MultipleChoiceCorrectAnswerDto": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of question",
                "enum": [
                  "MULTIPLE_CHOICE",
                  "TRUE_FALSE_GROUP",
                  "NUMBER_INPUT",
                  "TEXT_INPUT"
                ],
                "example": "MULTIPLE_CHOICE"
              },
              "value": {
                "type": "object",
                "description": "The index(es) of the correct choice(s). Single number for single answer, array for multiple answers",
                "examples": [
                  0,
                  [
                    0,
                    2
                  ]
                ]
              }
            },
            "required": [
              "type",
              "value"
            ]
          },
          "TrueFalseGroupCorrectAnswerDto": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of question",
                "enum": [
                  "MULTIPLE_CHOICE",
                  "TRUE_FALSE_GROUP",
                  "NUMBER_INPUT",
                  "TEXT_INPUT"
                ],
                "example": "TRUE_FALSE_GROUP"
              },
              "value": {
                "description": "Array of boolean values indicating true/false for each statement",
                "example": [
                  true,
                  false,
                  true
                ],
                "type": "array",
                "items": {
                  "type": "boolean"
                }
              }
            },
            "required": [
              "type",
              "value"
            ]
          },
          "NumberInputCorrectAnswerDto": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of question",
                "enum": [
                  "MULTIPLE_CHOICE",
                  "TRUE_FALSE_GROUP",
                  "NUMBER_INPUT",
                  "TEXT_INPUT"
                ],
                "example": "NUMBER_INPUT"
              },
              "value": {
                "type": "number",
                "description": "The correct numerical value",
                "example": 42.5
              }
            },
            "required": [
              "type",
              "value"
            ]
          },
          "TextInputCorrectAnswerDto": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of question",
                "enum": [
                  "MULTIPLE_CHOICE",
                  "TRUE_FALSE_GROUP",
                  "NUMBER_INPUT",
                  "TEXT_INPUT"
                ],
                "example": "TEXT_INPUT"
              },
              "value": {
                "type": "string",
                "description": "The correct text answer",
                "example": "The answer is 42"
              }
            },
            "required": [
              "type",
              "value"
            ]
          },
          "CreateQuestionDto": {
            "type": "object",
            "properties": {
              "content": {
                "type": "string",
                "description": "The content/text of the question",
                "example": "What is the capital of France?"
              },
              "type": {
                "type": "string",
                "description": "The type of question",
                "enum": [
                  "MULTIPLE_CHOICE",
                  "TRUE_FALSE_GROUP",
                  "NUMBER_INPUT",
                  "TEXT_INPUT"
                ],
                "example": "MULTIPLE_CHOICE"
              },
              "options": {
                "description": "Question-specific options based on the question type",
                "example": {
                  "type": "MULTIPLE_CHOICE",
                  "choices": [
                    "Paris",
                    "London",
                    "Berlin",
                    "Madrid"
                  ],
                  "multipleAnswers": false
                },
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/MultipleChoiceOptionsDto"
                  },
                  {
                    "$ref": "#/components/schemas/TrueFalseGroupOptionsDto"
                  },
                  {
                    "$ref": "#/components/schemas/NumberInputOptionsDto"
                  },
                  {
                    "$ref": "#/components/schemas/TextInputOptionsDto"
                  }
                ]
              },
              "correctAnswer": {
                "description": "The correct answer(s) for the question",
                "example": {
                  "type": "MULTIPLE_CHOICE",
                  "value": 0
                },
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/MultipleChoiceCorrectAnswerDto"
                  },
                  {
                    "$ref": "#/components/schemas/TrueFalseGroupCorrectAnswerDto"
                  },
                  {
                    "$ref": "#/components/schemas/NumberInputCorrectAnswerDto"
                  },
                  {
                    "$ref": "#/components/schemas/TextInputCorrectAnswerDto"
                  }
                ]
              },
              "explanation": {
                "type": "string",
                "description": "Optional explanation for the correct answer",
                "example": "Paris is the capital and most populous city of France."
              },
              "difficulty": {
                "type": "number",
                "description": "Difficulty level from 1 (easiest) to 5 (hardest)",
                "example": 2,
                "minimum": 1,
                "maximum": 5
              },
              "tags": {
                "description": "Optional tags for categorizing the question",
                "example": [
                  "geography",
                  "capitals"
                ],
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "subjectId": {
                "type": "string",
                "description": "Optional subject ID to associate the question with",
                "example": "123e4567-e89b-12d3-a456-426614174000"
              },
              "topicIds": {
                "description": "Optional topic IDs to associate the question with",
                "example": [
                  "123e4567-e89b-12d3-a456-426614174000",
                  "456e7890-e89b-12d3-a456-426614174001"
                ],
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "content",
              "type",
              "options",
              "correctAnswer"
            ]
          },
          "SignUpDto": {
            "type": "object",
            "properties": {
              "fullName": {
                "type": "string",
                "description": "User's full name",
                "example": "John Doe"
              },
              "email": {
                "type": "string",
                "description": "User's email address",
                "example": "john.doe@edtech.com"
              },
              "password": {
                "type": "string",
                "description": "User's password (minimum 6 characters)",
                "example": "Password@123"
              }
            },
            "required": [
              "fullName",
              "email",
              "password"
            ]
          },
          "SignInDto": {
            "type": "object",
            "properties": {
              "email": {
                "type": "string",
                "description": "The email of the user",
                "example": "john.doe@edtech.com"
              },
              "password": {
                "type": "string",
                "description": "User password",
                "example": "Password@123"
              }
            },
            "required": [
              "email",
              "password"
            ]
          },
          "VerifyEmailDto": {
            "type": "object",
            "properties": {
              "token": {
                "type": "string",
                "description": "Email verification token sent to user email",
                "example": "abc123def456ghi789jkl012mno345pqr678stu901vwx"
              }
            },
            "required": [
              "token"
            ]
          },
          "ResendVerificationDto": {
            "type": "object",
            "properties": {
              "email": {
                "type": "string",
                "description": "User email address to resend verification",
                "example": "john.doe@edtech.com"
              }
            },
            "required": [
              "email"
            ]
          },
          "PreferencesDto": {
            "type": "object",
            "properties": {
              "language": {
                "type": "string",
                "description": "User language",
                "example": "en"
              }
            }
          },
          "UpdateUserDto": {
            "type": "object",
            "properties": {
              "fullName": {
                "type": "string",
                "description": "User's full name",
                "example": "John Doe"
              },
              "gender": {
                "type": "string",
                "description": "User gender",
                "example": "male"
              },
              "phoneNumber": {
                "type": "string",
                "description": "User phone number",
                "example": "+1234567890"
              },
              "dateOfBirth": {
                "type": "string",
                "description": "User date of birth",
                "example": "1990-01-01",
                "format": "date"
              },
              "preferences": {
                "description": "User preferences",
                "example": {
                  "theme": "light",
                  "language": "en",
                  "notifications": {
                    "email": true,
                    "push": false,
                    "sms": true
                  }
                },
                "allOf": [
                  {
                    "$ref": "#/components/schemas/PreferencesDto"
                  }
                ]
              }
            }
          },
          "CreateTeacherRequestDto": {
            "type": "object",
            "properties": {
              "bio": {
                "type": "string",
                "description": "Teacher bio",
                "example": "Experienced mathematics teacher with 10+ years in education"
              },
              "qualifications": {
                "type": "string",
                "description": "Educational qualifications",
                "example": "Master of Education, Mathematics"
              },
              "experience": {
                "type": "number",
                "description": "Years of teaching experience",
                "example": 5,
                "minimum": 0,
                "maximum": 50
              },
              "specializations": {
                "description": "Areas of specialization",
                "example": [
                  "Mathematics",
                  "Algebra",
                  "Calculus"
                ],
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "customOptions": {
      "persistAuthorization": true
    }
  }
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname]
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
