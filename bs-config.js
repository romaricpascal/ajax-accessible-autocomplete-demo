
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
const countries = require('./suggestions.json');

const LATENCY = 100;
module.exports = {
    middleware: [
        {
            route: '/suggestions.json',
            handle: function(req, res, next) {
                console.log(req.url);
                const searchParams = new URLSearchParams(req.url.slice(1));
                const query = searchParams.get('query');
                setTimeout(() => {
                    if (query === 'trigger-error') {
                        res.writeHead(500);
                        res.end('Kaboom');
                        return;
                    }

                    const results = countries.filter(country => country.indexOf(query) !== -1)

                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify(results))
                }, LATENCY)
            }
        }
    ]
};
