import { Module } from '@nestjs/common';
import { OrderHeadersController } from './order-headers/order-headers.controller';
import { OrderHeadersService } from './order-headers/order-headers.service';
import { OrderDetailsController } from './order-details/order-details.controller';
import { OrderDetailsService } from './order-details/order-details.service';

@Module({
  controllers: [OrderHeadersController, OrderDetailsController],
  providers: [OrderHeadersService, OrderDetailsService],
  exports: [OrderHeadersService],
})
export class OrdersModule {}
