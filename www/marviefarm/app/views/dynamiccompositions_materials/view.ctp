<div class="dynamiccompositionsMaterials view">
<h2><?php  __('Dynamiccompositions Material');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Material Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['material_id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Dynamiccomposition Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['dynamiccomposition_id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Qta'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['qta']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Dynamiccompositions Material', true), array('action' => 'edit', $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Dynamiccompositions Material', true), array('action' => 'delete', $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Dynamiccompositions Materials', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Dynamiccompositions Material', true), array('action' => 'add')); ?> </li>
	</ul>
</div>
