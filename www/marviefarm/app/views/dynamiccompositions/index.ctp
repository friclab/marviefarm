<div class="dynamiccompositions index">
	<h2><?php __('Dynamiccompositions');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('code');?></th>
			<th><?php echo $this->Paginator->sort('description');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($dynamiccompositions as $dynamiccomposition):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $dynamiccomposition['Dynamiccomposition']['id']; ?>&nbsp;</td>
		<td><?php echo $dynamiccomposition['Dynamiccomposition']['code']; ?>&nbsp;</td>
		<td><?php echo $dynamiccomposition['Dynamiccomposition']['description']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $dynamiccomposition['Dynamiccomposition']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $dynamiccomposition['Dynamiccomposition']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $dynamiccomposition['Dynamiccomposition']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $dynamiccomposition['Dynamiccomposition']['id'])); ?>
		</td>
	</tr>
<?php endforeach; ?>
	</table>
	<p>
	<?php
	echo $this->Paginator->counter(array(
	'format' => __('Page %page% of %pages%, showing %current% records out of %count% total, starting on record %start%, ending on %end%', true)
	));
	?>	</p>

	<div class="paging">
		<?php echo $this->Paginator->prev('<< ' . __('previous', true), array(), null, array('class'=>'disabled'));?>
	 | 	<?php echo $this->Paginator->numbers();?>
 |
		<?php echo $this->Paginator->next(__('next', true) . ' >>', array(), null, array('class' => 'disabled'));?>
	</div>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('New FixComp - Material', true), array('controller' => 'fixedcompositions_materials','action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('New DynComp - Material', true), array('controller' => 'dynamiccompositions_materials','action' => 'add')); ?></li>
	
		<li><?php echo $this->Html->link(__('New Dynamiccomposition', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Fabrics', true), array('controller' => 'fabrics', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fabric', true), array('controller' => 'fabrics', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Materials', true), array('controller' => 'materials', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Material', true), array('controller' => 'materials', 'action' => 'add')); ?> </li>
	</ul>
</div>