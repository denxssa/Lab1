#!/bin/sh
set -e

cd /var/www/html

export PORT="${PORT:-80}"

if [ -n "$DATABASE_URL" ] && [ -z "$DB_URL" ]; then
    export DB_URL="$DATABASE_URL"
fi

if [ -n "$RENDER_EXTERNAL_URL" ] && [ -z "$APP_URL" ]; then
    export APP_URL="$RENDER_EXTERNAL_URL"
fi

envsubst '${PORT}' < /etc/nginx/default.conf.template > /etc/nginx/sites-available/default

if [ -z "$APP_KEY" ]; then
    echo "ERROR: APP_KEY is not set. Generate one with: php artisan key:generate --show"
    exit 1
fi

php artisan storage:link --force 2>/dev/null || true

if [ "$RUN_MIGRATIONS" = "true" ]; then
    php artisan migrate --force --no-interaction
fi

if [ "$RUN_SEEDER" = "true" ]; then
    php artisan db:seed --force --no-interaction
fi

php artisan package:discover --ansi

php artisan config:cache
php artisan route:cache
php artisan view:cache

exec "$@"
