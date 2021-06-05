import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

fdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create a game which "Create Game" is clicked', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const debugElement = fixture.debugElement;

    const buttons = debugElement.queryAll(By.css('button'));
    const createButton = buttons[0];
    const addButton = buttons[1];
    console.log('button?', createButton)
    // const createGameButton = nativeElement.querySelector('button');
    expect(createButton.nativeElement.textContent).toContain('Create Game');
    expect(addButton.nativeElement.textContent).toContain('Add Player');

    createButton.triggerEventHandler('click', null);
    // createGameButton.triggerEventHandler('click', null);
    console.log('await?')
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    console.log('done.')
    const gameContainer = debugElement.query(By.css('.game-state-container')); //nativeElement.querySelector('.game-state-container');

    console.log('container', gameContainer);
    expect(gameContainer.nativeElement.textContent).toContain('Players');

  });

  // it(`should have as title 'poker-fe'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('poker-fe');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('poker-fe app is running!');
  // });
});
