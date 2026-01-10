import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserSearchStateService {
  private result: any | null = null;

  setResult(result: any): void {
    this.result = result;
  }

  getResult(): any | null {
    return this.result;
  }

  clear(): void {
    this.result = null;
  }
}
    