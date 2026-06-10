<div class="articlesFabrics form">
<?php echo $this->Form->create('ArticlesFabric');?>
	<fieldset>
 		<legend><?php __('Edit Articles Fabric'); ?></legend>
	<?php
		echo $this->Form->input('id');
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

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('ArticlesFabric.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('ArticlesFabric.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Articles Fabrics', true), array('action' => 'index'));?></li>
	</ul>
</div>