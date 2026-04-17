<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

        <title><?php echo e(config('app.name', 'Laravel')); ?></title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <link rel="stylesheet" href="<?php echo e(mix('css/app.css')); ?>">
    </head>
    <body>
        <div id="app" data-app-name="<?php echo e(config('app.name')); ?>"></div>
        <script src="<?php echo e(mix('js/app.js')); ?>" defer></script>
    </body>
</html>
<?php /**PATH C:\xampp\htdocs\lab1\resources\views/welcome.blade.php ENDPATH**/ ?>