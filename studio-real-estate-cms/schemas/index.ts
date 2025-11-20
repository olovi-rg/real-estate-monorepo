import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContent'
import { categoryType } from './category'
import { postType } from './postType'
import { authorType } from './author'
import { propertyType } from './property'

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContentType,
  categoryType,
  postType,
  authorType,
  propertyType,
]

