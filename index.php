<?php
	require_once 'app/vendor/autoload.php';
	require_once 'app/config/propel.php';

	session_start();

	$app = new \Slim\Slim();

	$app->config(array(
		'templates.path' => './public'
	));

	$app->get('/hello/:name', function($name) {
		echo "Hello, $name";
	});

	$app->get('/volunteer', function() use ($app) {
		$app->render('volunteer.html');
	});

	$app->get('/mumshoppe', function() use ($app) {
		$app->render('mumshoppe.html');
	});

	$app->get('/', function() use ($app) {
		$app->render('mumshoppe.html');
	});

	require('app/api/customer.php');
	require('app/api/trinket.php');

	$app->run();
?>
