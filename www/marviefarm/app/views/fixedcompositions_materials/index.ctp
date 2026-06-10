<div class="fixedcompositionsMaterials index">
	<h2><?php __('Fixedcompositions Materials');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('fixedcomposition_id');?></th>
			<th><?php echo $this->Paginator->sort('material_id');?></th>
			<th><?php echo $this->Paginator->sort('qta');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($fixedcompositionsMaterials as $fixedcompositionsMaterial):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $fixedcompositionsMaterial['FixedcompositionsMaterial']['id']; ?>&nbsp;</td>
		<td><?php echo $fixedcompositionsMaterial['Fixedcomposition']['code']; ?>&nbsp;</td>
		<td><?php echo $fixedcompositionsMaterial['Material']['code']; ?>&nbsp;</td>
		<td><?php echo $fixedcompositionsMaterial['FixedcompositionsMaterial']['qta']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $fixedcompositionsMaterial['FixedcompositionsMaterial']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $fixedcompositionsMaterial['FixedcompositionsMaterial']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $fixedcompositionsMaterial['FixedcompositionsMaterial']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $fixedcompositionsMaterial['FixedcompositionsMaterial']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Fixedcompositions Material', true), array('action' => 'add')); ?></li>
	</ul>
</div>