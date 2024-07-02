import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from './schemeTypes/index'

export default defineConfig({
  name: "astro-sanity-template", // Can be whatever
  title: "Astro Sanity Template", // Can be whatever
  projectId: 'vxvtfhhc',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  },
});