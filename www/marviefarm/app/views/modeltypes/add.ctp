<div class="modeltypes form">
<?php echo $this->Form->create('Modeltype');?>
	<fieldset>
 		<legend><?php __('Add Modeltype'); ?></legend>
	<?php
		echo $this->Form->input('code');
		echo $this->Form->input('description');
		echo $this->Form->input('Sex');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Modeltypes', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Sexes', true), array('controller' => 'sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Sex', true), array('controller' => 'sexes', 'action' => 'add')); ?> </li>
	</ul>
</div>