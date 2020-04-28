import SerializeModel from "../../src/ws/serializer/SerializeModel";

const hello = function(say) {
    console.log(say);
}

test("hell-test-1", () => {
    expect(
        hello(new SerializeModel())
    );
})