<div class="dynamiccompositions view">
<h2><?php  __('Dynamiccomposition');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $dynamiccomposition['Dynamiccomposition']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Code'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $dynamiccomposition['Dynamiccomposition']['code']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Description'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $dynamiccomposition['Dynamiccomposition']['description']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Dynamiccomposition', true), array('action' => 'edit', $dynamiccomposition['Dynamiccomposition']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Dynamiccomposition', true), array('action' => 'delete', $dynamiccomposition['Dynamiccomposition']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $dynamiccomposition['Dynamiccomposition']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Dynamiccompositions', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Dynamiccomposition', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Fabrics', true), array('controller' => 'fabrics', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fabric', true), array('controller' => 'fabrics', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Materials', true), array('controller' => 'materials', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Material', true), array('controller' => 'materials', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Fabrics');?></h3>
	<?php if (!empty($dynamiccomposition['Fabric'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Code'); ?></th>
		<th><?php __('Description'); ?></th>
		<th><?php __('Fixedcomposition Id'); ?></th>
		<th><?php __('Dynamiccomposition Id'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($dynamiccomposition['Fabric'] as $fabric):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $fabric['id'];?></td>
			<td><?php echo $fabric['code'];?></td>
			<td><?php echo $fabric['description'];?></td>
			<td><?php echo $fabric['fixedcomposition_id'];?></td>
			<td><?php echo $fabric['dynamiccomposition_id'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'fabrics', 'action' => 'view', $fabric['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'fabrics', 'action' => 'edit', $fabric['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'fabrics', 'action' => 'delete', $fabric['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $fabric['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Fabric', true), array('controller' => 'fabrics', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
<div class="related">
	<h3><?php __('Related Materials');?></h3>
	<?php if (!empty($dynamiccomposition['Material'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Code'); ?></th>
		<th><?php __('Description'); ?></th>
		<th><?php __('Supplier Id'); ?></th>
		<th><?php __('Supplier Code'); ?></th>
		<th><?php __('Unitmeasurement Id'); ?></th>
		<th><?php __('Qty'); ?></th>
		<th><?php __('Price'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($dynamiccomposition['Material'] as $material):
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
			<td><?php echo $material['Unitmeasurement']['code'];?></td>
			<td><?php echo $material['DynamiccompositionsMaterial']['qta'];?></td>
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
