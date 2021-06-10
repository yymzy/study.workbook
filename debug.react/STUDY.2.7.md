# 2.7 组件的声明周期

> React组件的生命周期分为三个阶段，分别是：

1. 挂载阶段（Mounting）,从组件初始化开始，一直到组件创建完成并渲染到真实的DOM中。
2. 更新阶段（Updating），组件发生了更新，从组件开始更新，一直监测到组件完成更新并重新渲染DOM。
3. 卸载阶段（Unmounting），监听组件从DOM中卸载。

***

## 2.7.1 挂载阶段的生命周期函数

1. constructor(props)。初始化组件，继承自React.Component类，需要调用super(props)。
2. static getDerivedStateFromProps(props, state)；获取当前的 props 和 state ，然后根据 props 来对 state 进行修改。

   * 是一个静态方法，使用时内部不能使用this。
   * React 16.3 之后新增，使用时注意版本兼容。
   * 必须有返回值，其返回值是对state的修改。
   * 根据 props 来修改 state ，所以组件初始化时一定要定义 state

3. componentWillMount 组件即将挂载，注意一下问题

   * React 16.3 之后已经不建议使用，如果在 React 17.x 还想要使用，建议改写成 UNSAFE_componentWillMount。
   * 它和 getDerivedStateFromProps 不能共用。

4. render。 根据 return 中的值生成虚拟 DOM，然后提交给 ReactDOM，渲染真实的 DOM。
5. componentDidMount。虚拟 DOM 已添加到真实 DOM。

> 汇总：constructor -> getDerivedStateFromProps / componentWillMount -> render -> componentDidMount

***

## 2.7.2 更新阶段的生命周期函数

> 调用了 setState 等方法引起组件更新。组件更新的三个不同的过程：父组件更新引起的当前组件更新、当前组件自己更新、forceUpdate强制触发更新。

1. 父组件更新
   > 父组件更新引起的当前组件更新会调用的声明周期函数， React 16.3 前后略微有些差异。

   **React 16.3 之前**
   ***

   * componentWillReceiveProps(nextProps)，父组件更新后，子组件接收到的 props 时触发。this.props 是之前的 props，需要获取更新后的 props 需从参数 nextProps 中获取。
   * shouldComponentUpdate(nextProps, nextState)，用于判断是否进行组件更新。此时获取到 this.props 和 this.state 还是更新前的 props 和 state。改方法必须有一个布尔类型的返回值，返回 true 生命周期函数继续向下执行，组件继续更新，否则停止更新，后续生命周期不会触发。
   * componentWillUpdate(nextProps, nextState) 组件即将更新。props，state 同上。
   * render 根据新的 props 和 state 生成虚拟 DOM ，然后将新的虚拟 DOM 和旧的进行对不出更新点，更新正式 DOM。this.props 和 this.state 为更新后的 props 和 state。
   * componentDidUpdate(prevProps, prevState)。组件更新完毕，真实 DOM 已更新。

      > 汇总：componentWillReceiveProps -> showComponentUpdate -> componentDidUpdate -> render -> componentDidUpdate。

   **React 16.3 之后**
   ***
   > getDerivedStateFromProps 替代 componentWillReceiveProps，使用它之后 componentWillReceiveProps 与 componentWillUpdate 都不会执行。

   * static getDerivedStateFromProps(nextProps, nextState) 。
   * shouldComponentUpdate。
   * render 生成新的虚拟 DOM。
   * getSnapshotBeforeUpdate(prevProps, prevState)，该方法执行在 render 生成虚拟 DOM 之后，渲染真实 DOM之前，用于获取渲染前的 DOM 快照。
      * 方法中的 this.props 和 this.state 已经更新为新的 props 和 state。
      * 必须有返回值，其返回值会传递给 componentDidUpdate。

   * componentDidUpdate(prevProps, prevState, snapshot)。

      > 汇总：static getDerivedStateFromProps -> shouldComponentDidUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate。

2. 组件自己更新

   > 组件内部调用 setState 。三个版本 React 16.3 之前、之后、React 16.4。

     * React 16.3 之前：shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate。自己更新不再监听 props 的变化，之监听 state 的修改。
     * React 16.3 中：shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate。
     * React 16.4 及之后：自更新与父组件更新统一，static getDerivedStateFromProps -> shouldComponentUpdate -> render getSnapshotBeforeUpdate -> componentDidUpdate。

3. forceUpdate。
   > 组件依赖的数据不是 state 时 数据改变了，此时希望视图也改变就可以使用 forceUpdate。强制更新不再调用 shouldComponentUpdate。

***

## 2.7.3 卸载阶段的生命周期函数

> componentWillUnmount 组件即将卸载，通常用于删掉一些组件加在全局中的内容。
