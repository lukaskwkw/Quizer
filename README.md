## Based on 
[react-boilerplate-cra-template](https://github.com/react-boilerplate/react-boilerplate-cra-template)

## Install & Start

Clone repo and hit

```shell
npm install
```
in repo directory.

---

Start using

```shell
npm run start
```


## Features

You can simply add/update/remove your quiz questions in 
<code>src/app/pages/HomePage/slice/questions.tsx</code>

The format of questions is pretty simple.

```js
  {
    id: '1',
    answers: ['2'],  //list of option ids that are correct ones
    isMultiAnswer: false,
    question: 'Year of release of first BF game?',
    showAnswers: false,
    imageUrl: '/images/cannon.jpg', // main image url location
    options: [
      {
        id: '1',
        option: '2000',
      },
      {
        id: '2',
        option: '2002',
      },
      {
        id: '3',
        option: '2004',
      },
      {
        id: '4',
        option: '2008',
      },
    ],
  },
```

for imageUrl you can use remote address or local from public folder