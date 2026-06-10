<div class="sizes view">
<h2><?php  __('Size');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $size['Size']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Code'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $size['Size']['code']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Description'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $size['Size']['description']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Size', true), array('action' => 'edit', $size['Size']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Size', true), array('action' => 'delete', $size['Size']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $size['Size']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Sizes', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Size', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypes Sexes', true), array('controller' => 'modeltypes_sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltypes Sex', true), array('controller' => 'modeltypes_sexes', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Modeltypes Sexes');?></h3>
	<?php if (!empty($size['ModeltypesSex'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Modeltype Id'); ?></th>
		<th><?php __('Sex Id'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($size['ModeltypesSex'] as $modeltypesSex):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $modeltypesSex['id'];?></td>
			<td><?php echo $modeltypesSex['modeltype_id'];?></td>
			<td><?php echo $modeltypesSex['sex_id'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'modeltypes_sexes', 'action' => 'view', $modeltypesSex['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'modeltypes_sexes', 'action' => 'edit', $modeltypesSex['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'modeltypes_sexes', 'action' => 'delete', $modeltypesSex['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $modeltypesSex['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Modeltypes Sex', true), array('controller' => 'modeltypes_sexes', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
