FROM php:8.2-apache

# Installer les extensions PHP nécessaires
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurer Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN a2enmod rewrite

# Copier le projet
WORKDIR /var/www/html
COPY . .

# Installer les dépendances
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Créer le fichier SQLite
RUN touch /var/www/html/database/database.sqlite
RUN chown www-data:www-data /var/www/html/database/database.sqlite

EXPOSE 80

CMD ["bash", "-c", "php artisan migrate --force && php artisan db:seed --force && apache2-foreground"]