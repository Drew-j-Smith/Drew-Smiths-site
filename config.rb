# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end

activate :external_pipeline,
  name: :wasm_pack,
  command: "wasm-pack build --target web --out-dir pkg/sudoku external-projects/sudoku",
  source: "external-projects/sudoku/pkg",
  latency: 1

activate :external_pipeline,
  name: :emscripten,
  command: "cd external-projects/smithscript && emcc src/main.cpp -Isrc -Ilib/compile-time-regular-expressions/single-header -std=c++20 -sEXPORTED_FUNCTIONS=_wasm_parse,_main -sEXPORTED_RUNTIME_METHODS=cwrap -o web/parser_wasm.js",
  source: "external-projects/smithscript/web",
  latency: 1
