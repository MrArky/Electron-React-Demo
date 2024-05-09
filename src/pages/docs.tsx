import { useRequest } from "ahooks";
import { extend } from 'umi-request';
import Button from "antd/es/button";

const myRequest = extend({
  timeoutMessage: "请求超时请重试",
  throwErrIfParseFail: true,
  getResponse: false,
});

const DocsPage = () => {

  const getDisc = useRequest(async () => {
    const res = await window.myAPI.doSomething();
    return res;
  });


  /**
   * 获取天气信息
   */
  const getWeather = useRequest(async () => {
    const res = await myRequest.get('https://api.uomg.com/api/rand.qinghua?format=json');
    return res.content;
  }, {});

  return (
    <div>
      <p>点击下方按钮可以更新土味情话：{getWeather.loading ? '加载中...' : getWeather.data}</p>
      <Button onClick={getWeather.run}>点我再来一个</Button>
      <p>点击下方按钮可以打开本地文件磁盘信息</p>
      <Button type='primary' onClick={getDisc.run}>点我刷新</Button>
      <div>{getDisc.loading ? '加载中...' : getDisc.data?.toString().split?.('\r\r\n').map((c,i) => <div key={i}>{c}</div>)}</div>
    </div>
  );
};

export default DocsPage;
