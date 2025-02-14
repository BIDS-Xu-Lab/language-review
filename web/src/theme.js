export const theme = {
    semantic: {
        primary: {
            50: '{zinc.50}',
            100: '{zinc.100}',
            200: '{zinc.200}',
            300: '{zinc.300}',
            400: '{zinc.400}',
            500: '{zinc.500}',
            600: '{zinc.600}',
            700: '{zinc.700}',
            800: '{zinc.800}',
            900: '{zinc.900}',
            950: '{zinc.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{zinc.950}',
                    inverseColor: '{zinc.100}',
                    hoverColor: '{zinc.900}',
                    activeColor: '{zinc.950}'
                },
            },
            dark: {
                primary: {
                    color: '{zinc.50}',
                    inverseColor: '{zinc.950}',
                    hoverColor: '{zinc.100}',
                    activeColor: '{zinc.200}'
                },
            }
        }
    },
    components: {
        button: {
            colorScheme: {
                light: {
                    text: {
                        primary: {
                            hoverBackground: '{zinc.200}',
                        }
                    }
                }
            }
        },
        datatable: {
            colorScheme: {
                light: {
                    row: {
                        selected: {
                            color: '{zinc.900}',
                            background: '{zinc.200}'
                        }
                    }
                },
                dark: {
                    row: {
                        selected: {
                            color: '{zinc.50}',
                            background: '{zinc.600}'
                        }
                    }
                }
            }
        }
    }
}