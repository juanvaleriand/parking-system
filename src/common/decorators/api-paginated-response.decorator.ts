import { applyDecorators, Type } from "@nestjs/common";
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PageDto } from "src/common/dtos/page.dto";
import { ResponseDto } from "../dtos/response.dto";

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel
) => {
  return applyDecorators(
    ApiExtraModels(PageDto),
    ApiOkResponse({
      description: "Successfully received model list",
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })
  );
};

export const ApiResponse = () => {
    return applyDecorators(
        ApiExtraModels(ResponseDto),
        ApiCreatedResponse({
          description: "Successfully store or update a resources",
          schema: {
            allOf: [
              { $ref: getSchemaPath(ResponseDto) },
            ],
          },
        })
    );
}