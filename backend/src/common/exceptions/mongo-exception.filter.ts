import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    ConflictException,
  } from '@nestjs/common';
  import { MongoServerError } from 'mongodb';
  import { Response } from 'express';
  
  @Catch(MongoServerError)
  export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoServerError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      if (exception.code === 11000) {
        const field = Object.keys(exception.keyPattern || {})[0];
        const value = exception.keyValue?.[field];
  
        return response.status(409).json({
          statusCode: 409,
          message: `${field} "${value}" ya está registrado.`,
          error: 'Conflict',
        });
      }
  
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
  