<div class="sexes view">
<h2><?php  __('Sex');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $sex['Sex']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Code'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $sex['Sex']['code']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Description'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $sex['Sex']['description']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Sex', true), array('action' => 'edit', $sex['Sex']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Sex', true), array('action' => 'delete', $sex['Sex']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $sex['Sex']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Sexes', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Sex', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Modeltypes', true), array('controller' => 'modeltypes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltype', true), array('controller' => 'modeltypes', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Modeltypes');?></h3>
	<?php if (!empty($sex['Modeltype'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Code'); ?></th>
		<th><?php __('Description'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($sex['Modeltype'] as $modeltype):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $modeltype['id'];?></td>
			<td><?php echo $modeltype['code'];?></td>
			<td><?php echo $modeltype['description'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'modeltypes', 'action' => 'view', $modeltype['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'modeltypes', 'action' => 'edit', $modeltype['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'modeltypes', 'action' => 'delete', $modeltype['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $modeltype['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Modeltype', true), array('controller' => 'modeltypes', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
