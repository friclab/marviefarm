<?php
/**
 *
 * PHP versions 4 and 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright 2005-2010, Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright 2005-2010, Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       cake
 * @subpackage    cake.cake.console.libs.templates.skel.views.layouts
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
?>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">-->
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<title>
		<?php __('MARVIEFARM:'); ?>
		<?php echo $title_for_layout; ?>
	</title>
	<?php
	   //echo $this->Html->script('prototype');  
	 //echo $this->Html->script('scriptaculous');  
	 echo $this->Html->script('jquery');
	
		echo $this->Html->meta('icon');

		echo $this->Html->css('cake.generic');

		echo $scripts_for_layout;
	if (isset($this->Js)){ echo $this->Js->writeBuffer(); }
	?>
</head>
<body>
	<div id="container">
		<div id="header">
			<h1 style="text-align: right;"><img src="<?php echo $this->webroot; ?>/img/logo.jpg" style="height: 80px" ></img></h1>
			
			<div id="myMenu" style="background-color: white; float: left; width:80%">
			<!--<?php echo $this->Html->link(__('List Sexes', true), array('controller' => 'sexes', 'action' => 'index')); ?>|--> 
			<?php echo $this->Html->link(__('List Projects', true), array('controller' => 'projects', 'action' => 'index')); ?>|
			<?php echo $this->Html->link(__('List Customers', true), array('controller' => 'customers', 'action' => 'index')); ?>|
			<?php echo $this->Html->link(__('New Customer', true), array('controller' => 'customers', 'action' => 'add')); ?>|
			<?php echo $this->Html->link(__('List Suppliers', true), array('controller' => 'suppliers', 'action' => 'index')); ?>|
			<?php echo $this->Html->link(__('List Articles', true), array('controller' => 'articles', 'action' => 'index')); ?>|
			<?php echo $this->Html->link(__('List Materials', true), array('controller' => 'materials', 'action' => 'index')); ?>|
			<?php echo $this->Html->link(__('List Fabrics', true), array('controller' => 'fabrics', 'action' => 'index')); ?>|
			<?php echo $this->Html->link(__('List Orders', true), array('controller' => 'orderheaders', 'action' => 'index')); ?>|
			<?php echo $this->Html->link(__('New Order', true), array('controller' => 'orderheaders', 'action' => 'add')); ?>|
			</div>
			<div style="background-color: white; text-align: right; "><?php echo $this->Html->link(__('Logout', true), array('controller' => 'users', 'action' => 'logout')); ?></div>
		</div>
		<div id="content">

			<?php echo $this->Session->flash(); ?>

			<?php echo $content_for_layout; ?>

		</div>
		<div id="footer">
			<?php echo $this->Html->link(
					$this->Html->image('cake.power.gif', array('alt'=> __('CakePHP: the rapid development php framework', true), 'border' => '0')),
					'http://www.cakephp.org/',
					array('target' => '_blank', 'escape' => false)
				);
			?>
		</div>
	</div>
	<?php echo $this->element('sql_dump'); ?>
</body>
</html>