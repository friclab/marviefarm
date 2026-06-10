<div class="modeltypessexesSizes view">
<h2><?php  __('Modeltypessexes Size');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $modeltypessexesSize['ModeltypessexesSize']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Modeltypes Sex'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($modeltypessexesSize['ModeltypesSex']['id'], array('controller' => 'modeltypes_sexes', 'action' => 'view', $modeltypessexesSize['ModeltypesSex']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Size'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($modeltypessexesSize['Size']['code'], array('controller' => 'sizes', 'action' => 'view', $modeltypessexesSize['Size']['id'])); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Modeltypessexes Size', true), array('action' => 'edit', $modeltypessexesSize['ModeltypessexesSize']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Modeltypessexes Size', true), array('action' => 'delete', $modeltypessexesSize['ModeltypessexesSize']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $modeltypessexesSize['ModeltypessexesSize']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypessexes Sizes', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypessexes Size', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Sizes', true), array('controller' => 'sizes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Size', true), array('controller' => 'sizes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypes Sexes', true), array('controller' => 'modeltypes_sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypes Sex', true), array('controller' => 'modeltypes_sexes', 'action' => 'add')); ?> </li>
	</ul>
</div>
