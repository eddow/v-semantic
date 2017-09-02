import Vue, { PropOptions, WatchOptions } from 'vue';
import Component from 'vue-class-component';
import 'reflect-metadata';
export declare type Constructor = {
    new (...args: any[]): any;
};
/**
 * decorator of an inject
 * @param key key
 * @return PropertyDecorator
 */
export declare function Inject(key?: string | symbol): PropertyDecorator;
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
export declare function Provide(key?: string | symbol): PropertyDecorator;
/**
 * decorator of model
 * @param  event event name
 * @return PropertyDecorator
 */
export declare function Model(event?: string, options?: (PropOptions | Constructor[] | Constructor)): PropertyDecorator;
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export declare function Prop(options?: (PropOptions | Constructor[] | Constructor)): PropertyDecorator;
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
export declare function Watch(path: string, options?: WatchOptions): MethodDecorator;
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
export declare function Emit(event?: string): MethodDecorator;
export { Component, Vue };
