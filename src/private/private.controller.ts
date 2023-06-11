import { Controller, Get } from '@nestjs/common';
import { Authenticated } from '../utils/nest';
import { PrivateService } from './private.service';

@Controller('private')
@Authenticated()
export class PrivateController {
  constructor(private readonly privateService: PrivateService) {}

  @Get()
  public simpleGet() {
    return 'I am private get'
  }
}
