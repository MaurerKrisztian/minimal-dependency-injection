[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_minimal-dependency-injection)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_minimal-dependency-injection&metric=bugs)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_minimal-dependency-injection)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_minimal-dependency-injection&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_minimal-dependency-injection)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_minimal-dependency-injection&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_minimal-dependency-injection)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_minimal-dependency-injection&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_minimal-dependency-injection)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_minimal-dependency-injection&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_minimal-dependency-injection)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_minimal-dependency-injection&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_minimal-dependency-injection)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_minimal-dependency-injection&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_minimal-dependency-injection)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_minimal-dependency-injection&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_minimal-dependency-injection)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=MaurerKrisztian_minimal-dependency-injection&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=MaurerKrisztian_minimal-dependency-injection)

# minimal-dependency-injection-container [![npm version](https://badge.fury.io/js/minimal-dependency-injection-container.svg)](https://badge.fury.io/js/minimal-dependency-injection-container)
### Minimal DI container, which support:
* bean registration:
  * new instantiation
  * singleton
  * constant definition
  * factory
* bean injection by key, type


### Setup:
#### tsconfig.json:
```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true, 
  "target": "es6"
}
```

### Decorators:
```typescript
@Injectable() 
@Inject(key: string) // inject class constructor parameters or method parameters
@InjectProperty(key: string) // inject class property
@RunBefore(key: string) // when call a method run before
@RunAfter(key: string) // when call a method run after return
@Setter() // run after class instantification
@InitMethod()  // run after class instantification
@MethodWrapper(key: string)  // wrap the function with a IMethodWrapper class
@FactoryMethod()
@AddTags(tags) //  you can retrieve the entities it from the container with the tags
```

### REGISTER:
```typescript
//REGISTER
container.register('key', value) //value can be a class definition, constant or a function
// you have some options when register: 
// .asPrototype, .asSingleton .asConstant(), .asFactory(factoryFnName?: string), .withContext(context: {})
container.register('key2', value).asPrototype() //new instance
container.register('key3', value).asSingleton() //as singleton
container.register('key4', value).asSingleton().withContext({'paramKey': 'otherKey', 'paramKey2': 'otherKey2'}) // register with context: @Inject('paramKey') ... it will replace to 'otherKey'
container.register('key4', 'some constant').asConstant() // register constant
container.register('factoryKey', FactoryClass).asFactory();
container.register('factoryResult', String).asFactoryResult('factoryKey');

container.registerTypes([MyClass, Myclass2]) // registrate by type
```

### RESOLVE:
```typescript
//RESOLVE
const resolveResult = await container.resolve<Type>('key');
const productController = await container.resolveByType<ProductController>(ProductController)
```
## Before - After
Before:
```typescript
const productController  = new ProductController(new CacheService(new ProductRepository(new Database(connect)), new ScraperService(new ScraperServiceOptions(), true)));
```
After:
```typescript
const container = new Container({enableAutoCreate: true});
const productController = await container.resolveByType<ProductController>(ProductController)
```

After 2:
```typescript
const container = new Container({enableAutoCreate: true});
container.registerTypes([
  ProductController,
  CacheService,
  ProductRepository,
  Database,
  ScraperService,
  ScraperServiceOptions,
])
const productController = await container.resolveByType<ProductController>(ProductController)
```

After 3:
```typescript
const container = new Container();
container.register('ScraperServiceOptions',  ScraperServiceOptions).asSingleton();
container.register('visible', true).asConstant()
container.register('ScraperService', ScraperService).asSingleton();
container.register('connection', connect).asConstant();
container.register('Database', Database).asSingleton();
container.register('ProductRepository', ProductRepository).asSingleton();
container.register('CacheService', CacheService).asSingleton();
container.register('ProductController', ProductController).asSingleton();
const productController = await container.resolve<ProductController>('ProductController');
```
Or can be combined as you wish.


### Simplest usage without registration:

```typescript
@Injectable
class Something {

    public getValue() {
        return "more";
    }
}

@Injectable
class SomethingElse {
    constructor(private readonly something: Something, private readonly str: string = "pizza") {
    }

    public getValue() {
        return `need ${this.something.getValue()} ${this.str}`;
    }
}

@Injectable
class Client {
    constructor(private readonly something: Something, private readonly somethingElse: SomethingElse) {
    }

    public say() {
        return `I ${this.somethingElse.getValue()} and ${this.something.getValue()} coffee.`;
    }
}

@Injectable
class Service {
    constructor(private readonly client: Client) {
    }

    public check() {
        return `client says: ${this.client.say()}`;
    }
}

// create the container
const container = new Container({enableAutoCreate: true});

// resolve without registration any @Injectable class
const service = await container.resolveByType<Service>(Service);

console.log(service.check());  // it will be: "client says: I need more pizza and more coffee."
```


#### If you don't enable enableAutoCreate, the above code will look like this:
```typescript
    const container = new Container();

    // registrate all dependencies 
    await container.registerTypes([
        Something,
        Client,
        Service,
        SomethingElse
    ]);

    // you can run a coontainer test, it will check all the the dependencies.
    // container.containerTest(); // if something missing throw a error

    const service = await container.resolveByType<Service>(Service);
    console.log(service.check());  // it will be: "client says: I need more pizza and more coffee."
```


#### You can specify every injected key:
```typescript
class Client {
  constructor(@Inject('value') private readonly value: string) {
  }
  public say() {
    return `hello ${this.value}`;
  }
}
class Service {
  constructor(@Inject('client') private readonly client: Client) {}
  public check() {
    return `client says: ${this.client.say()}`;
  }
}
const container: IContainer = new Container();
container.register('value', "world");
container.register('client', Client);
container.register('service', Service);
const service = container.resolve<Service>('service');
console.log(service.check()); // Should write "client says: hello world"
```


### @InjectProperty example
```typescript
    class Test {
        @InjectProperty('value')
        testProp: any;
        
        @InjectProperty('value2')
        testProp2: any;
        
        constructor() {
        }
    }
    container.register('value', 'happy');
    container.register('value2', 'panda');
    container.register('test', Test);
    const testObj = await container.resolve<Test>('test');
    console.log(`I am a ${testObj.testProp} ${testObj.testProp2}`) // result: I am a happy panda
```

### @Stetter() example
```typescript
        const container = new Container();
        class SetterTestClass {
            panda: string = "sad panda";
            @Setter()
            set pandaSetter(@Inject('param1') param1: string) {
                this.panda = param1;
            }
            constructor() {
            }
        }
        const param1 = "happy panda"
        container.register('SetterTestClass', SetterTestClass);
        container.register('param1', param1)
        const setterTestClass = await container.resolve<SetterTestClass>('SetterTestClass');
        console.log(setterTestClass.panda) // it should be "happy panda"
```



### @RunAfter, @RunBefore, @MethodWrapper example
#### !! Currently don't work with "this" ref !!
* you can use this decorators individually or together
```typescript
    class Test {
        @MethodWrapper('MyMethodWrapper')
        @RunAfter('MyRunAfter')
        @RunBefore('MyRunBefore')
        testFn(p: string, p2: string) {
            console.log("p = " + p, " p2 = " + p2);
        }
    }
    class MyRunAfter implements IRunAfter {
        run(): void {
            console.log('run this after.')
        }
    }
    class MyRunBefore implements IRunBefore {
        run() {
            console.log("run before.")
        }
    }
    class MyMethodWrapper implements IMethodWrapper {
        run(next: Function, params: any[]): any {
            console.log("wrapper before.")
            next(...params);
            console.log("wrapper after.")
        }
    }
}
    container.register('MyRunBefore', MyRunBefore);
    container.register('MyRunAfter', MyRunAfter);
    container.register('MyMethodWrapper', MyMethodWrapper);
    container.register('test', Test);
    const testObj = await container.resolve<Test>('test');
    testObj.testFn('test', 'test2');
// log result:    
/*
wrapper before.
run before.
p = test  p2 = test2
run this after.
wrapper after.
*/
```

#### Factory sample:
```typescript
export class FactoryClass {
    constructor(@Inject("factoryParam1") private readonly value: string) {
    }
    getValue() {
        return this.value;
    }
    create() {
        return "This is ths FactoryClass create() result."
    }
    @FactoryMethod()
    factoryMethodName(@Inject('factoryMethodKey1') value: string, @Inject('factoryMethodKey2') value2: string) {
        return "factoryMethodName result: value: " + value + " value2: " + value2;
    }
    create2() {
        return "create2 result";
    }
}
const container = new Container();
const firstFactoryParam = "firstFactoryParam";
const secondFactoryParam = "secondFactoryParam";
container.register('factoryParam1', 'factoryParam1 constant data').asConstant()
container.register('factoryMethodKey1', firstFactoryParam).asConstant();
container.register('factoryMethodKey2', secondFactoryParam).asConstant();
container.register('factoryKey', FactoryClass).asFactory()
// if asFactory() param empty call the @FactoryMethod fn, but if it is not exist default is create()
container.register('factoryResult', String).asFactoryResult('factoryKey');
const factoryResult = container.resolve<String>('factoryResult'); // it will be "factoryResult:  factoryMethodName result: value: firstFactoryParam value2: secondFactoryParam"
container.register('otherParam1', 'replaced1').asConstant();
container.register('otherParam2', 'replaced2').asConstant();
container.register('factoryKey2', FactoryClass).asFactory();
container.register('factoryResult2', String).asFactoryResult('factoryKey2').withMethodContext({'factoryMethodKey1': 'otherParam1', 'factoryMethodKey2': 'otherParam2'});
const factoryResult2 = container.resolve<String>('factoryResult2'); // it will be: factoryResult:  factoryMethodName result: value: replaced1 value2: replaced2
```
