/* global setTimeout */
// # EventEmitter class
// Simple re-implementation of Angular 2's [EventEmitter](https://github.com/angular/angular/blob/master/modules/angular2/src/facade/async.ts#L97)
import Subject from '@reactivex/rxjs/dist/cjs/Subject';

export class EventEmitter{
  _subject = new Subject();

  observer(generator){
    return this._subject
      .subscribe(
        value => setTimeout(() => generator.next(value)),
        error => generator.throw ? generator.throw(error) : null,
        () => generator.return ? generator.return() : null
      );
  }

  toRx(){
    return this._subject;
  }

  next(value){
    this._subject.onNext(value);
  }

  throw(error){
    this._subject.onError(error);
  }

  return(){
    this._subject.onCompleted();
  }
}
