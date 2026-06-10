<div class="dynamiccompositionsMaterials index">
	<h2><?php __('Dynamiccompositions Materials');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('material_id');?></th>
			<th><?php echo $this->Paginator->sort('dynamiccomposition_id');?></th>
			<th><?php echo $this->Paginator->sort('qta');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($dynamiccompositionsMaterials as $dynamiccompositionsMaterial):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['id']; ?>&nbsp;</td>
		<td><?php echo $dynamiccompositionsMaterial['Dynamiccomposition']['code']; ?>&nbsp;</td>
		<td><?php echo $dynamiccompositionsMaterial['Material']['code']; ?>&nbsp;</td>
		<td><?php echo $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['qta']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $dynamiccompositionsMaterial['DynamiccompositionsMaterial']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Dynamiccompositions Material', true), array('action' => 'add')); ?></li>
	</ul>
</div>