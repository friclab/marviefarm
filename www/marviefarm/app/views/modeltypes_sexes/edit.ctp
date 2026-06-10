<div class="modeltypesSexes form">
<?php echo $this->Form->create('ModeltypesSex');?>
	<fieldset>
 		<legend><?php __('Edit Modeltypes Sex'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('modeltype_id');
		echo $this->Form->input('sex_id');
		echo $this->Form->input('ModeltypessexesSize');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('ModeltypesSex.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('ModeltypesSex.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Modeltypes Sexes', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Modeltypes', true), array('controller' => 'modeltypes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltype', true), array('controller' => 'modeltypes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Sexes', true), array('controller' => 'sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Sex', true), array('controller' => 'sexes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Articles', true), array('controller' => 'articles', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Article', true), array('controller' => 'articles', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypessexes Sizes', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypessexes Size', true), array('controller' => 'modeltypessexes_sizes', 'action' => 'add')); ?> </li>
	</ul>
</div>