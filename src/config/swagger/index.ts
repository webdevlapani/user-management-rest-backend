import path from 'path';
import SwaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const swaggerDoc = yaml.load(path.join(__dirname, './swagger.yaml'));

export const swagger = SwaggerUi.setup(swaggerDoc);
