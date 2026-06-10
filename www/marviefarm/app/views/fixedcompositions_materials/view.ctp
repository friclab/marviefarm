<div class="fixedcompositionsMaterials view">
<h2><?php  __('Fixedcompositions Material');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $fixedcompositionsMaterial['FixedcompositionsMaterial']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Fixedcomposition Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $fixedcompositionsMaterial['FixedcompositionsMaterial']['fixedcomposition_id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Material Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $fixedcompositionsMaterial['FixedcompositionsMaterial']['material_id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Qta'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $fixedcompositionsMaterial['FixedcompositionsMaterial']['qta']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Fixedcompositions Material', true), array('action' => 'edit', $fixedcompositionsMaterial['FixedcompositionsMaterial']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Fixedcompositions Material', true), array('action' => 'delete', $fixedcompositionsMaterial['FixedcompositionsMaterial']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $fixedcompositionsMaterial['FixedcompositionsMaterial']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Fixedcompositions Materials', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fixedcompositions Material', true), array('action' => 'add')); ?> </li>
	</ul>
</div>
