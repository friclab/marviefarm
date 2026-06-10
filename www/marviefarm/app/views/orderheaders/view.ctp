 

<div class="orderheaders view">
<h2><span><?php  __('Orderheader');?></span><span  style="text-align:right;  float:right;">
<?php echo $this->Html->link( $html->image("pdf.gif") , array('action' => 'exportPdf', $orderheader['Orderheader']['id']),array('escape' => false)); ?>
&nbsp;&nbsp;
<?php echo $this->Html->link( $html->image("newmail.gif") , array('action' => 'sendMail', $orderheader['Orderheader']['id']),array('escape' => false)); ?>  

</span></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $orderheader['Orderheader']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Order Number'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $orderheader['Orderheader']['order_number']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Description'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $orderheader['Orderheader']['description']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Customer'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($orderheader['Customer']['name'], array('controller' => 'customers', 'action' => 'view', $orderheader['Customer']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Collection'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($orderheader['Collection']['name'], array('controller' => 'collections', 'action' => 'view', $orderheader['Collection']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Date'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $orderheader['Orderheader']['date']; ?>
			&nbsp;
		</dd>		
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Note'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $orderheader['Orderheader']['note']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Partial Total'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $partialTotal; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php echo __('Discount') .'('.$orderheader['Orderheader']['discount'].'%)'; ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $discountAmount; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Subtotal'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $subtotal; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php echo __('Vat'). ($orderheader['Customer']['vat_applied']>0? ' ('.number_format($orderheader['Customer']['vat_applied'],2).'%)' :''); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $vat; ?>
			&nbsp;
		</dd>		
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Grandtotal'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $grandtotal; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Payment'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $orderheader['Orderheader']['payment']; ?>
			&nbsp;
		</dd>
	</dl>
</div>

<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		
		<li><?php echo $this->Html->link(__('Edit Orderheader', true), array('action' => 'edit', $orderheader['Orderheader']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Orderheader', true), array('action' => 'delete', $orderheader['Orderheader']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $orderheader['Orderheader']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Orderheaders', true), array('action' => 'index')); ?> </li> 
	</ul>
</div>

<div class="actions">
		<ul>
		<li><?php echo $this->Html->link(__('Choose Quantity', true), array('action' => 'chooseQuantity', $orderheader['Orderheader']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Choose Quantity WS', true), array('action' => 'chooseQuantityWS', $orderheader['Orderheader']['id'])); ?> </li>
			<li><?php echo $this->Html->link(__('New Orderdetail', true), array('controller' => 'orderdetails', 'action' => 'add','id' => $orderheader['Orderheader']['id']));?> </li>
			<li><?php echo $this->Html->link(__('New Orderdetail 2', true), array('controller' => 'orderdetails', 'action' => 'add2','id' => $orderheader['Orderheader']['id']));?> </li>
		</ul>
		  <?php //echo $this->element('countdown'); ?>
	</div>

<div class="related">
	<h3><?php __('Related Orderdetails');?></h3>
	<?php if (!empty($orderheader['Orderdetail'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Order Number'); ?></th>
		<th><?php __('Article'); ?></th>
		<th><?php __('Note'); ?></th>
		<th><?php __('Fabric'); ?></th>
		<th><?php __('Size'); ?></th>
		<th><?php __('Unit Price (€)'); ?></th>
		<th><?php __('Qty'); ?></th>
		<th><?php __('Total Price (€)'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		 
		foreach ($orderheader['Orderdetail'] as $orderdetail):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $orderdetail['id'];?></td>
			<td><?php echo $orderdetail['Orderheader']['order_number'];?></td>
			<td><?php echo $orderdetail['Article']['name'];?></td>
			<td><?php echo $orderdetail['note'];?></td>
			<td><?php echo $orderdetail['Fabric']['code'].' - '.$orderdetail['Fabric']['description'];?></td>
			<td><?php echo $orderdetail['ModeltypessexesSize']['Size']['code'];?></td>
			<td><?php echo $orderdetail['Fabric']['price'];?></td>
			<td><?php echo $orderdetail['qta'];?></td>
				<td><?php echo number_format($orderdetail['qta']*$orderdetail['Fabric']['price']  ,2);?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'orderdetails', 'action' => 'view', $orderdetail['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'orderdetails', 'action' => 'edit', $orderdetail['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'orderdetails', 'action' => 'delete', $orderdetail['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $orderdetail['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	
</div>
