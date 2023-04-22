const users = [
    {username: 'HelloKitty02', email: 'Hellokitty02many@gmail.com'},
    {username: 'Keroppi', email: 'keroppiSanrio@gmail.com'},
    {username: 'Badtz-Maru', email: 'Badtz-Maru@comcast.net'},
    {username: 'Gudetama', email: 'Gudetama@aol.com'},
    {username: 'MyMelody', email: 'MyMelody@gmail.com'},
];

const thoughts = [
    {thoughtText: 'That was nice!', username: 'HelloKitty02',reactions:[{reactionBody: 'This is my reaction (O_O)', username: 'Gudetama'}]},
    {thoughtText: 'That was really cool!', username: 'Keroppi', reactions:[{reactionBody: 'A heart reaction <3 from me!', username: 'HelloKitty02'}]},
    {thoughtText: 'I have another thought!', username: 'Badtz-Maru', reactions:[{reactionBody: 'Hearts Hearts Hearts', username: 'MyMelody'}]},
    {thoughtText: 'That was really amazing!', username: 'Gudetama', reactions:[{reactionBody: 'Bah!', username: 'Badtz-Maru'}]},
    {thoughtText: 'Aw that made me cry!', username: 'MyMelody'},
];


module.exports = {users, thoughts};