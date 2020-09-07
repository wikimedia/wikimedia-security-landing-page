# security.wikimedia.org

Lovingly forked from the Performance Team's [site](https://gerrit.wikimedia.org/g/performance/docroot/) visible at (performance.wikimedia.org)[https://performance.wikimedia.org], with inspiration from the Research Team's [site](https://gerrit.wikimedia.org/g/research/landing-page/) visible at [research.wikimedia.org](https://research.wikimedia.org).

## Prerequisites

* Node.js 10 or later.
* [Ruby](https://www.ruby-lang.org/) (tested with Ruby 2.7)
* [Bundler](https://bundler.io/) (if missing, install with `gem install bundler`)

## Development

* Install or update Jekyll and plugins:
  ```
  bundle update
  ```

* Start a Jekyll server for local development at at <http://127.0.0.1:4000/> (automatically watches for changes and updates in real-time):
  ```
  bundle exec jekyll serve
  ```

* Let Jekyll build the site to `public_html/` for deployment, to then stage and commit with Git:
  ```
  bundle exec jekyll build -d public_html/
  ```

* Install npm dependencies (only needed for recompiling stylesheets or renewing external info)
  ```
  npm ci
  ```

* Recompile the stylesheet (keeps running to watch for updates)
  ```
  npm run less:watch
  ```

* Renew external information (e.g. blog posts):
  ```
  npm run renew
  ```
