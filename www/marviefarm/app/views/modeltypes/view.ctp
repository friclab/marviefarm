<div class="modeltypes view">
<h2><?php  __('Modeltype');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $modeltype['Modeltype']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Code'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $modeltype['Modeltype']['code']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Description'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $modeltype['Modeltype']['description']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Modeltype', true), array('action' => 'edit', $modeltype['Modeltype']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Modeltype', true), array('action' => 'delete', $modeltype['Modeltype']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $modeltype['Modeltype']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypes', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltype', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Sexes', true), array('controller' => 'sexes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Sex', true), array('controller' => 'sexes', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Sexes');?></h3>
	<?php if (!empty($modeltype['Sex'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Code'); ?></th>
		<th><?php __('Description'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($modeltype['Sex'] as $sex):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $sex['id'];?></td>
			<td><?php echo $sex['code'];?></td>
			<td><?php echo $sex['description'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'sexes', 'action' => 'view', $sex['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'sexes', 'action' => 'edit', $sex['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'sexes', 'action' => 'delete', $sex['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $sex['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Sex', true), array('controller' => 'sexes', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
