<div class="fabrics view">
<h2><?php  __('Fabric');?></h2>
<?php echo $this->Form->create('Fabric');?> <?php
echo $this->Form->input('multiply');
echo $this->Form->input('show_details',array('type'=>'checkbox'));
echo $this->Form->end(__('Calculate!!', true));
?></div>
<div class="actions">
<h3><?php __('Actions'); ?></h3>
<ul>
	<li><?php echo $this->Html->link(__('List Fabrics', true), array('action' => 'index')); ?>
	</li>
	<li><?php echo $this->Html->link(__('List Orderdetails', true), array('controller' => 'orderdetails', 'action' => 'index')); ?>
	</li>
	<li><?php echo $this->Html->link(__('List Articles', true), array('controller' => 'articles', 'action' => 'index')); ?>
	</li>
</ul>
</div>
