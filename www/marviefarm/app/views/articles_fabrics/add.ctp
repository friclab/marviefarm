<div class="articlesFabrics form">
<?php echo $this->Form->create('ArticlesFabric');?>
	<fieldset>
 		<legend><?php __('Add Articles Fabric'); ?></legend>
	<?php
		echo $this->Form->input('fabric_id');
		echo $this->Form->input('article_id');
		echo $this->Form->input('price');
		echo $this->Form->input('cost');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Articles Fabrics', true), array('action' => 'index'));?></li>
	</ul>
</div>