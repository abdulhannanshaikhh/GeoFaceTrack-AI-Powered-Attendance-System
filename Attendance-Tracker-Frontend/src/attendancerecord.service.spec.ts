import { TestBed } from '@angular/core/testing';

import { AttendancerecordService } from './attendancerecord.service';

describe('AttendancerecordService', () => {
  let service: AttendancerecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendancerecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
