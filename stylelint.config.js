/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
  plugins: ["stylelint-scss"],
  overrides: [{ files: ["**/*.scss"], customSyntax: "postcss-scss" }],
  rules: {
    "selector-id-pattern": null,                    
    // formatting noise:
    "rule-empty-line-before": null,
    "declaration-block-single-line-max-declarations": null,
    "no-descending-specificity": null,
    "media-feature-range-notation": null,           
    "scss/dollar-variable-empty-line-before": null, 

    
  }
};
