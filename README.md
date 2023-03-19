<p align="center">
    <a href="https://laravel.com" target="_blank">
        <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
    </a>
</p>

# Laravel Best Practices

<hr>

## Table of Contents
<details>
  <summary>
    <a href="#1-project-structure-practices">1. Code Style Practices (6)</a>
  </summary>

&emsp;&emsp;[1.1 Use shorter and more readable syntax where possible](#-11-use-shorter-and-more-readable-syntax-where-possible)</br>

&emsp;&emsp;[1.2 Keep bussiness logic out of the controller and use a service class instead](#-12-keep-bussiness-logic-out-of-the-controller-and-use-a-service-class-instead)</br>

&emsp;&emsp;[1.3 Carry out validation in request classes](#-13-carry-out-validation-in-request-classes)</br>

&emsp;&emsp;[1.4 Chunk data for heavy data](#-14-chunk-data-for-heavy-data)</br>

&emsp;&emsp;[1.5 Don't use environment variables (.env) directly in your code](#-15-dont-use-environment-variables-env-directly-in-your-code)</br>

&emsp;&emsp;[1.6 Prevent N+1 issues with eager loading](#-16-prevent-n1-issues-with-eager-loading)</br>

</details>

# `1. Code Style Practices`

## ![✔] 1.1 Use shorter and more readable syntax where possible

### Code Example

```
// instead of this:
$request->session()->put('key', 'value');
$request->session()->get('key');

// do this:
session(['key' => 'value']);
session('key');
```

```
// instead of this:
if ($request->has('key')) {
    $value = $request->input('key');
} else {
    $value = 'default value';
}

// do this:
$value = $request->input('key', 'default value');
```

```
// instead of this:
$user = User::whereId(1)->first();
if ($user) {
    $user->name = 'John Doe';
    $user->save();
}

// do this:
$user = User::whereId(1)->first();
if ($user) {
    $user->update(['name' => 'John Doe']);
}
```

```
// instead of this:
User::whereId(1)->orderBy('created_at', 'desc')->get();
User::whereId(1)->orderBy('created_at', 'asc')->get();
User::whereId(1)->orderBy('age', 'desc')->get();
User::select('id', 'name', 'age')->get();

// do this:
User::whereId(1)->latest()->get();
User::whereId(1)->oldest()->get();
User::whereId(1)->latest('age')->get();
User::get(['id', 'name', 'age']);
```
<hr>

## ![✔] 1.2 Keep bussiness logic out of the controller and use a service class instead
it's easier to test and maintain, and it's easier to reuse the code, so you can use the same service class in other controllers, avoid having issues with always repeating the same code in different controllers.

### Code Example

```
// instead of this:
class InvoiceController extends Controller
{
    public function store(Request $request)
    {
        // your bussiness logic code...
    }
}

// do this:
// create a InvoiceService.php and put inside App/Services

class InvoiceService
{
    public function generateInvoice($data) : void
    {
        // your bussiness logic code...
    }
}

// you can inject the service in the constructor

class InvoiceController extends Controller
{
    private $invoiceService;

    public function __construct(InvoiceService $invoiceService)
    {
        $this->invoiceService = $invoiceService;
    }

    public function store(Request $request)
    {
        $this->invoiceService->generateInvoice($data);
    }
}
```
<hr>

## ![✔] 1.3 Carry out validation in request classes
all request validation  should not be done in controller, it should be done in FormRequest class, and then call it in controller. You can use the cammand "php artisan make:request CreateInvoiceRequest" to create a FormRequest class

### Code Example

```
// instead of this:
public function store(Request $request)
{
    $validation = Validator::make($request->all(), [
        'xxx' => 'required',
        'xxx' => 'required',
    ]);

    if ($validation->fails()) {
        return response()->json([
            'status' => 'error',
            'message' => $validation->errors()->first(),
        ], 400);
    }
}

// do this:
class CreateInvoiceRequest extends FormRequest
{
    public function rules()
    {
        return [
            'xxx' => 'required',
            'xxx' => 'required',
        ];
    }
}

public function store(CreateInvoiceRequest $request)
{
    $input = $request->validated();
}
```
<hr>

## ![✔] 1.4 Chunk data for heavy data
chunk data for heavy data, so it will not load all data at once to memory and cause memory leak

in this example, we will get all users and chunk them into 1000 users per chunk then we will process each chunk and return the result

### Code Example

```
// instead of this:
$users = User::all();

foreach ($users as $user) {
    // do something
}

// do this:
$users = User::all();
$users->chunk(1000, function ($users) {
    // process each chunk
    foreach ($users as $user) {
        // do something
    }
});

```
<hr>

## ![✔] 1.5 Don't use environment variables (.env) directly in your code
### Code Example

```
// instead of this:
$env = env('APP_ENV');
if ($env == 'production') {
    // Do something
}

// do this:
$env = config('app.env');
if ($env == 'production') {
    // Do something
}
```
<hr>

## ![✔] 1.6 Prevent N+1 issues with eager loading
### Code Example
```
// let's say we have a list of users and we want to get their posts
$users = User::all();

// this will result in N+1 issues
foreach ($users as $user) {
    $user->posts;
}

// this will prevent N+1 issues, because we are eager loading the posts
$users = User::with('posts')->get();
```


<hr>
These are just a few examples of best practices for Laravel development. By following these guidelines and staying up to date with the latest Laravel developments, you can build powerful and efficient web applications with ease.




