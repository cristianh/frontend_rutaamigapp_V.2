import { TestBed } from '@angular/core/testing';

import { SocketComunicationService } from './socket-comunication.service';

describe('SocketComunicationService', () => {
  let service: SocketComunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketComunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
