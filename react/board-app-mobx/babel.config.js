module.exports = {
    plugins: [
        ["@babel/plugin-proposal-class-properties", { loose: false }],
        ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
    // Babel >= 7.13.0 (https://babeljs.io/docs/en/assumptions)
    assumptions: {
        setPublicClassFields: false,
    },
};
