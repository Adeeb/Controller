/*
 *  *******************************************************************************
 *  * Copyright (c) 2018 Edgeworx, Inc.
 *  *
 *  * This program and the accompanying materials are made available under the
 *  * terms of the Eclipse Public License v. 2.0 which is available at
 *  * http://www.eclipse.org/legal/epl-2.0
 *  *
 *  * SPDX-License-Identifier: EPL-2.0
 *  *******************************************************************************
 *
 */
const constants = require('../helpers/constants');

const CatalogController = require('../controllers/catalog-controller');
const ResponseDecorator = require('../decorators/response-decorator');
const Errors = require('../helpers/errors');

module.exports = [
  {
    method: 'get',
    path: '/api/v3/catalog/microservices',
    middleware: (req, res) => {
      res
        .status(constants.HTTP_CODE_SUCCESS)
        .send(req.body)
    }
  },
  {
    method: 'post',
    path: '/api/v3/catalog/microservices',
    middleware: async (req, res) => {

      const successCode = 201;
      const errorCodes = [
        {
          code: constants.HTTP_CODE_BAD_REQUEST,
          errors: [Errors.ValidationError]
        },
        {
          code: constants.HTTP_CODE_UNAUTHORIZED,
          errors: [Errors.AuthenticationError]
        },
        {
          code: constants.HTTP_CODE_DUPLICATE_PROPERTY,
          errors: [Errors.DuplicatePropertyError]
        }
      ];

      const createCatalogItemEndpoint = ResponseDecorator.handleErrors(
        CatalogController.createCatalogItemEndPoint,
        successCode,
        errorCodes
      );
      const response = await createCatalogItemEndpoint(req);

      res
        .status(response.code)
        .send(response.body)
    }
  },
  {
    method: 'get',
    path: '/api/v3/catalog/microservices/:id',
    middleware: (req, res) => {
      res
        .status(constants.HTTP_CODE_SUCCESS)
        .send(req.body)
    }
  },
  {
    method: 'patch',
    path: '/api/v3/catalog/microservices/:id',
    middleware: (req, res) => {
      res
        .status(constants.HTTP_CODE_SUCCESS)
        .send(req.body)
    }
  },
  {
    method: 'delete',
    path: '/api/v3/catalog/microservices/:id',
    middleware: (req, res) => {
      res
        .status(constants.HTTP_CODE_SUCCESS)
        .send(req.body)
    }
  }
]
