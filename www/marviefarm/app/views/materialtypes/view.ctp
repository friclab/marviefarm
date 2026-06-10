<div class="materialtypes view">
<h2><?php  __('Materialtype');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $materialtype['Materialtype']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Code'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $materialtype['Materialtype']['code']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Description'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $materialtype['Materialtype']['description']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Materialtype', true), array('action' => 'edit', $materialtype['Materialtype']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Materialtype', true), array('action' => 'delete', $materialtype['Materialtype']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $materialtype['Materialtype']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Materialtypes', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Materialtype', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Materials', true), array('controller' => 'materials', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Material', true), array('controller' => 'materials', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Materials');?></h3>
	<?php if (!empty($materialtype['Material'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Code'); ?></th>
		<th><?php __('Description'); ?></th>
		<th><?php __('Supplier Id'); ?></th>
		<th><?php __('Supplier Code'); ?></th>
		<th><?php __('Unitmeasurement Id'); ?></th>
		<th><?php __('Materialtype Id'); ?></th>
		<th><?php __('Price'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($materialtype['Material'] as $material):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $material['id'];?></td>
			<td><?php echo $material['code'];?></td>
			<td><?php echo $material['description'];?></td>
			<td><?php echo $material['supplier_id'];?></td>
			<td><?php echo $material['supplier_code'];?></td>
			<td><?php echo $material['unitmeasurement_id'];?></td> 
			<td><?php echo $material['price'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'materials', 'action' => 'view', $material['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'materials', 'action' => 'edit', $material['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'materials', 'action' => 'delete', $material['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $material['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Material', true), array('controller' => 'materials', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
