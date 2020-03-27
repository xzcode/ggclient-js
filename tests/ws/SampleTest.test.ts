import JsonSerializer from "../../src/ws/serializer/JsonSerializer";
import SerializeModel from "../../src/ws/serializer/SerializeModel";

function hello(say:any) {
    console.log(say)
}
test("hell-test-1", () => {
    expect(
        hello(new SerializeModel())
      );
})