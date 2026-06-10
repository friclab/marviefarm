<div class="materials view">
<h2><?php  __('Material');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $material['Material']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Code'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $material['Material']['code']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Description'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $material['Material']['description']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Supplier'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($material['Supplier']['company'], array('controller' => 'suppliers', 'action' => 'view', $material['Supplier']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Supplier Code'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $material['Material']['supplier_code']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Unitmeasurement'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($material['Unitmeasurement']['code'], array('controller' => 'unitmeasurements', 'action' => 'view', $material['Unitmeasurement']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Price'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $material['Material']['price']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Material', true), array('action' => 'edit', $material['Material']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Material', true), array('action' => 'delete', $material['Material']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $material['Material']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Materials', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Material', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Suppliers', true), array('controller' => 'suppliers', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Supplier', true), array('controller' => 'suppliers', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Unitmeasurements', true), array('controller' => 'unitmeasurements', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Unitmeasurement', true), array('controller' => 'unitmeasurements', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Materialtypes', true), array('controller' => 'materialtypes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Materialtype', true), array('controller' => 'materialtypes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Dynamiccompositions', true), array('controller' => 'dynamiccompositions', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Dynamiccomposition', true), array('controller' => 'dynamiccompositions', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Fixedcompositions', true), array('controller' => 'fixedcompositions', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fixedcomposition', true), array('controller' => 'fixedcompositions', 'action' => 'add')); ?> </li>
	</ul>
</div>
<!--<div class="related">
 	<h3><?php __('Related Dynamiccompositions');?></h3>
	<?php if (!empty($material['Dynamiccomposition'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Code'); ?></th>
		<th><?php __('Description'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($material['Dynamiccomposition'] as $dynamiccomposition):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $dynamiccomposition['id'];?></td>
			<td><?php echo $dynamiccomposition['code'];?></td>
			<td><?php echo $dynamiccomposition['description'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'dynamiccompositions', 'action' => 'view', $dynamiccomposition['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'dynamiccompositions', 'action' => 'edit', $dynamiccomposition['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'dynamiccompositions', 'action' => 'delete', $dynamiccomposition['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $dynamiccomposition['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Dynamiccomposition', true), array('controller' => 'dynamiccompositions', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>

 -->
 
 <!-- 
<div class="related">
	<h3><?php __('Related Fixedcompositions');?></h3>
	<?php if (!empty($material['Fixedcomposition'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Code'); ?></th>
		<th><?php __('Description'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($material['Fixedcomposition'] as $fixedcomposition):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $fixedcomposition['id'];?></td>
			<td><?php echo $fixedcomposition['code'];?></td>
			<td><?php echo $fixedcomposition['description'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'fixedcompositions', 'action' => 'view', $fixedcomposition['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'fixedcompositions', 'action' => 'edit', $fixedcomposition['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'fixedcompositions', 'action' => 'delete', $fixedcomposition['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $fixedcomposition['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Fixedcomposition', true), array('controller' => 'fixedcompositions', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>

 -->
<div class="related">
	<h3><?php __('Related Materialtypes');?></h3>
	<?php if (!empty($material['Materialtype'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Code'); ?></th>
		<th><?php __('Description'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($material['Materialtype'] as $materialtype):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $materialtype['id'];?></td>
			<td><?php echo $materialtype['code'];?></td>
			<td><?php echo $materialtype['description'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'materialtypes', 'action' => 'view', $materialtype['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'materialtypes', 'action' => 'edit', $materialtype['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'materialtypes', 'action' => 'delete', $materialtype['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $materialtype['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Materialtype', true), array('controller' => 'materialtypes', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
